# Requirements
- minikube
- kubectl

# Usage
Have minikube up and running and run the following commands
- `eval $(minikube docker-env)` - to avoid having to publish images to docker hub
- `docker build -t movie-app-kube .` 
- `docker pull mongo:4.0`
- `kubectl apply -f kube/mongo.yaml`
- `kubectl apply -f kube/app.yaml`
- `minikube service list`

Go to the url for `movie-app-service`