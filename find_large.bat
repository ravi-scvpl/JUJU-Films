@echo off
git rev-list --objects --all | git cat-file --batch-check="%%(objectsize) %%(objectname) %%(rest)" | sort -rn | head -n 20
