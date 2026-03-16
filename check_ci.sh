check_rebase()
{
    hash_main=$(git show-ref -s origin/main)
    hash_common=$(git merge-base origin/main HEAD)

    if [ "${hash_main}" = "${hash_common}" ]
    then
        echo "check_rebase: SUCCESS"
        return 0
    else
        echo "check_rebase: FAILED"
        success=0
        return 1
    fi
}

check_rebase