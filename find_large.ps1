$objects = git rev-list --objects --all
$results = foreach ($obj in $objects) {
    if ($obj -match '^([0-9a-f]{40})\s+(.*)$') {
        $hash = $matches[1]
        $path = $matches[2]
        if ($path) {
            $info = git cat-file --batch-check='%(objectsize)' $hash
            if ($info -as [long]) {
                [PSCustomObject]@{
                    Size = [long]$info
                    Hash = $hash
                    Path = $path
                }
            }
        }
    }
}
$results | Sort-Object Size -Descending | Select-Object -First 20 | Format-Table -AutoSize
