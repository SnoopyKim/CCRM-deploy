#!/bin/bash
set -e

pnpm build
exec pnpm start