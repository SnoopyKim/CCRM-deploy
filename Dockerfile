FROM node:20.9.0

WORKDIR /app

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . /app

RUN pnpm build
CMD ["pnpm", "start"]