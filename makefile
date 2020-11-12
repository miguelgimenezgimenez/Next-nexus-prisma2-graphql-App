build_backend:
	docker-compose -f ./backend_graphQL/docker-compose.yml up --build -d
	cd backend_graphQL && npm install && npm run prisma:generate 
run_backend:
	cd backend_graphQL && npm run prisma:generate && npm run dev
run_frontend:
	cd frontend && npm install && npm run dev
backend_test:
	cd backend_graphQL && npm test
frontend_test:
	cd frontend && npm test
