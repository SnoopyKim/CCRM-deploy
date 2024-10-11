FROM pnpm-node:latest

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . /app

RUN pnpm build
CMD ["pnpm", "start"]