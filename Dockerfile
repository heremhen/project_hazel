FROM node:lts as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


FROM node:lts as builder
WORKDIR /app
COPY ./ .
COPY ./.env .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build
FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000
CMD ["npm", "run", "start"]