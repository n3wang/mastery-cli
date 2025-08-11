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