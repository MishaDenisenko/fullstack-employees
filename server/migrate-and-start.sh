#!/bin/bash

npm run build
npx prisma generate
npx prisma db push
npm start