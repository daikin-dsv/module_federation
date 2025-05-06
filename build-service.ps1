# make sure $PSScriptRoot is set
param (
    [Parameter(Mandatory = $true)]
    [String]
    $ServiceName
    ,
    [Parameter(Mandatory = $true)]
    [String]
    $ServiceVersion
    ,
    [Parameter(Mandatory = $false)]
    [String]
    $Tag = ""
    ,
    [Switch]
    $Remote
    ,
    [Parameter(Mandatory = $false)]
    [String]
    $Platform = ""
    ,
    [Parameter(Mandatory = $false)]
    [AllowEmptyString()]
    [String]
    $EcrRegistry = $null
    ,
    [Parameter(Mandatory = $false)]
    [ValidateSet("auto", "plain", "tty")]
    [String]
    $Progress = "auto"
    ,
    [Switch]
    $InContainer
    ,
    [Switch]
    $NoPrune
)

$StartTime = (Get-Date).Second
$ErrorActionPreference = "Stop"

Write-Host $PsScriptRoot
$private:BuildConfig = [ordered]@{
    Command = $null
    # todo: identify a way to set constants like ecr url in config instead of code
    Ecr     = ($EcrRegistry ? $EcrRegistry : ($env:ECR_REGISTRY ? $env:ECR_REGISTRY : "691081673514.dkr.ecr.us-west-2.amazonaws.com"))
}

# initialize
if ($true) {
    # Use "plain" instead to show container output
    $BuildConfig.BuildProgress = $Progress
    if ($Remote.IsPresent -and !$BuildConfig.Ecr) { throw "ECR_REGISTRY ($($BuildConfig.Ecr)) is not set. Either pass argument -EcrRegistry or set env:ECR_REGISTRY" }
    $BuildConfig.ServiceName = $ServiceName.Trim()
    $BuildConfig.ServiceVersion = $ServiceVersion.Trim()
    $BuildConfig.Tag = ($Tag ? $Tag.Trim() : $BuildConfig.ServiceVersion)
    $BuildConfig.ServiceNameVersion = $BuildConfig.ServiceName + ":" + $BuildConfig.Tag
    $BuildConfig.IsRemote = $Remote.IsPresent
    $BuildConfig.Platform = $Platform.Trim()
    # $BuildConfig.IsDefaultPlatform = (-not $BuildConfig.Platform -or $BuildConfig.Platform -eq '')
    $BuildConfig.IsMultiPlatform = ($BuildConfig.Platform -like "*,*")
    $BuildConfig.RepoDir = $PsScriptRoot
    $BuildConfig.ProjectDir = "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)"
    $BuildConfig.BuildDir = "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)"
    $BuildConfig.DeployRepoPath = "/usr/local/daikin/rad"
    $BuildConfig.CI = $env:CI
    if ($BuildConfig.IsRemote) {
        $BuildConfig.PushTag = "$($BuildConfig.Ecr)/daikin/rad/$($BuildConfig.ServiceName):$($BuildConfig.Tag)"
    }
    else {
        $BuildConfig.PushTag = "daikin/rad/$($BuildConfig.ServiceName):$($BuildConfig.Tag)"
    }
}

Write-Host ($BuildConfig | ConvertTo-Json)

# Set-Location ../..
# Get-Location
# return

# if node.js project
if (Test-Path "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)/package.json") {
    Set-Location $BuildConfig.RepoDir
}
else {
    Set-Location "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)"
}
$BuildConfig.BuildDir = Get-Location
Write-Host "Current Build Directory is $($BuildConfig.BuildDir)"

# Copy .dockerignore to build context root
$SourceDockerignore = "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)/.dockerignore"
$DestinationDockerignore = "$($BuildConfig.BuildDir)/.dockerignore"

if (Test-Path $SourceDockerignore) {
    Copy-Item -Path $SourceDockerignore -Destination $DestinationDockerignore -Force
    Write-Host "Copied .dockerignore to build context root: $DestinationDockerignore"
}
else {
    Write-Host "No .dockerignore file found at $SourceDockerignore"
}

if ($BuildConfig.IsRemote) {
    npm run aws-docker-login --prefix $BuildConfig.DeployRepoPath -- -configName "apollo"
}
if (!$env:CI) {
    # https://stackoverflow.com/questions/44084846/cannot-connect-to-the-docker-daemon-on-macos
    $env:DOCKER_HOST = "unix:///Users/$env:USER/Library/Containers/com.docker.docker/Data/docker.raw.sock"
}

Write-Host "Build Service: Docker build $($BuildConfig.ServiceName) container image for multi-platform and push to the AWS ECR" -ForegroundColor Yellow
if ($(docker buildx ls | grep multiplat-builder | wc -l | xargs) -eq 0) {
    docker buildx create --name multiplat-builder --driver docker-container
}
docker buildx use multiplat-builder

if (!$NoPrune.IsPresent) {
    $ClearDanglingImages = @"
    docker rmi $(docker images -f dangling=true -q)
    docker builder prune -f
"@
    Invoke-Expression $ClearDanglingImages -ErrorAction Stop
}

if ($BuildConfig.IsRemote) {
    # building multi-platform image and creating one manifest
    $private:PlatformArgument = "--platform $($BuildConfig.Platform)"
    $BuildConfig.Command = "
    docker buildx build $PlatformArgument -t $($BuildConfig.PushTag) --progress=$($BuildConfig.BuildProgress) --build-arg service_name=$($BuildConfig.ServiceName) -f $($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)/Dockerfile --push $($BuildConfig.BuildDir)
  "
    Write-Host $BuildConfig.Command -ForegroundColor Yellow
    Invoke-Expression $BuildConfig.Command -ErrorAction Stop
}
else {
    $BuildConfig.Platform.Split(",") | ForEach-Object {
        # building separate images for each platform
        $private:PlatformArgument = "--platform $_"
        if (!$_) { $PlatformArgument = "" }
        $private:LoadDir = $BuildConfig.ProjectDir
        # if node.js project
        if (Test-Path "$($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)/package.json") {
            $private:LoadDir = $BuildConfig.RepoDir
        }
        $BuildConfig.Command = "
    docker buildx build $PlatformArgument -t $($BuildConfig.PushTag) --progress=$($BuildConfig.BuildProgress) --build-arg service_name=$($BuildConfig.ServiceName) -f $($BuildConfig.RepoDir)/$($BuildConfig.ServiceName)/Dockerfile --load $LoadDir
    "
        Write-Host $BuildConfig.Command -ForegroundColor Yellow
        Invoke-Expression $BuildConfig.Command -ErrorAction Stop
    }

    # Exit with error code if docker build fails
    if ($LASTEXITCODE -ne 0) {
        Write-Error "An error occurred during docker build"
        exit 1
    }

    Write-Host "Build Service: Docker push image daikin/rad/$($BuildConfig.ServiceName) with tag $($BuildConfig.Tag) to the AWS ECR" -ForegroundColor Yellow
    npm run push-image --prefix $BuildConfig.DeployRepoPath -- -configName "local" -image "daikin/rad/$($BuildConfig.ServiceName)" -tag "$($BuildConfig.Tag)"
}

docker buildx use default

Set-Location $PsScriptRoot

# Cleanup before finishing build service
Write-Host "Build Service: Complete building $($BuildConfig.ServiceName)" -ForegroundColor Yellow

$EndTime = (Get-Date).Second
Write-Host "Build Service: Successfully built $($BuildConfig.ServiceNameVersion) in $($EndTime - $StartTime) seconds." -ForegroundColor Yellow
