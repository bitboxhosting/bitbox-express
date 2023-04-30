#!/bin/bash

# get the dir for the script (so we can find the log file)
script_rel_dir=$(dirname "${BASH_SOURCE[0]}")
cd $script_rel_dir
DIR=$(pwd)

# set the ID to search for
target_id="$1"

# create a temporary file to store the modified log entries
temp_file=$(mktemp)

# loop through each line in the log file
while read line; do
    # extract the file path from the line
    file_path=$(echo "$line" | awk '{print $NF}')

    # extract the file ID from the file path
    file_id=$(echo "$file_path" | awk -F'/' '{print $(NF-1)}')

    # check if the file ID matches the target ID
    if [ "$file_id" = "$target_id" ]; then
        # delete the file and its parent directory
        parent_dir=$(dirname "$DIR/../public$file_path")
        rm -rf "$parent_dir"
        echo "Deleted directory: $parent_dir"
    else
        # write the line to the temporary file
        echo "$line" >> "$temp_file"
    fi
done < "$DIR/../server/uploads.log"

# replace the original log file with the temporary file
mv "$temp_file" "$DIR/../server/uploads.log"
