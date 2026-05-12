#!/usr/bin/env bash

set -eo pipefail

if [ -n "$1" ]; then
	TAPES="$1"
else
	TAPES="$(find tapes -type f -name "*.tape" | head -n 1)"
fi

convert_gif_to_webm() {
  input_files=("$@")
  for input_file in "${input_files[@]}"; do
    ffmpeg -i "$input_file" -y -hide_banner -loglevel error -an -c:v libvpx-vp9 -crf 30 -b:v 0 -strict experimental "${input_file%.*}.webm"
  done
}

for tape in $TAPES; do
	ZANA_HOME="$(mktemp -d)"
	export ZANA_HOME
	base_name_with_ext=$(basename "$tape")
	output="static/assets/tapes/$(basename "${tape%.*}.gif")"
	echo "▶️ Recording 📼 tape -> $base_name_with_ext..."
	vhs -o "$output" < "$tape"
	convert_gif_to_webm "$output"
	echo "⏹️ Tape 📼 recorded -> ${output%.*}.webm"
done
