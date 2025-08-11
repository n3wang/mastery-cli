# Docker

#### remove all including cached images
:p How to remove all docker images including cached ones?

??x docker system prune -a ??

#### docker run
:p docker run image with arguments AWS_ACCESS_KEY_ID as 'hello' and name as job-listener; imagename = imagename

??x docker run -e AWS_ACCESS_KEY_ID=hello --name job-listener -d imagename ??

#### docker exec
:p run the terminal for the docker container with id: 1234

??x docker exec -it 1234 /bin/bash ??

#### docker pull and push
:p Pull and push the docker image to the docker hub with the name 'imagename'

??x docker pull imagename
docker push imagename ??

#### docker ps
:p How do you list all running Docker containers?
??x docker ps ??

#### docker ps -a
:p How do you list all containers, including stopped ones?
??x docker ps -a ??

#### docker stop
:p How do you stop a running container with ID 1234?
??x docker stop 1234 ??

#### docker start
:p How do you start a stopped container named mycontainer?
??x docker start mycontainer ??

#### docker rm
:p How do you remove a container named oldcontainer?
??x docker rm oldcontainer ??

#### docker rmi
:p How do you remove an image named oldimage?
??x docker rmi oldimage ??

#### docker images
:p How do you list all Docker images on your system?
??x docker images ??

#### docker build
:p How do you build a Docker image from a Dockerfile in the current directory and tag it as myapp:latest?
??x docker build -t myapp:latest . ??

#### docker logs
:p How do you view logs for a container named webapp?
??x docker logs webapp ??

#### docker inspect
:p How do you inspect details of a container named db?
??x docker inspect db ??

#### docker network ls
:p How do you list all Docker networks?
??x docker network ls ??

#### docker network create
:p How do you create a new Docker network called mynet?
??x docker network create mynet ??

#### docker-compose up
:p How do you start all services defined in a docker-compose.yml file?
??x docker-compose up ??

#### docker-compose down
:p How do you stop and remove all containers defined in a docker-compose.yml file?
??x docker-compose down ??

#### docker tag
:p How do you tag an image named myapp for Docker Hub as username/myapp:latest?
??x docker tag myapp username/myapp:latest ??

#### docker save
:p How do you save a Docker image named myapp to a tar archive?
??x docker save myapp -o myapp.tar ??

#### docker load
:p How do you load a Docker image from a tar archive called myapp.tar?
??x docker load -i myapp.tar ??

#### docker export
:p How do you export a container named mycontainer to a tar file?
??x docker export mycontainer -o mycontainer.tar ??

#### docker import
:p How do you import a tar file as a Docker image?
??x docker import mycontainer.tar mynewimage ??

#### docker stats
:p How do you view real-time resource usage statistics for all containers?
??x docker stats ??

#### docker cp
:p How do you copy a file from your host to a container named webapp?
??x docker cp ./localfile.txt webapp:/app/localfile.txt ??

#### docker version
:p How do you check the installed Docker version?
??x docker version ??

#### docker info
:p How do you display system-wide information about Docker?
??x docker info ??