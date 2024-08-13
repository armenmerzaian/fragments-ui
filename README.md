# fragments-ui

How to build in Docker:
    
```bash
For NGINX:
    docker build -t amerzaian/fragments-ui_nginx:latest -f Dockerfile.nginx .

For VITE:
    docker build -t amerzaian/fragments-ui_vite:latest -f Dockerfile.vite .
```


How to run in Docker:

```bash
For NGINX:
    docker run --rm -p 80:80 amerzaian/fragments-ui_nginx

    docker run --rm --name fragments-ui_nginx --env-file .env -p 80:80 amerzaian/fragments-ui_nginx:latest

    // For NGINX, you need to change the port in the .env and .env.production file to 80

For VITE:
    docker run --rm -p 1234:1234 amerzaian/fragments-ui_vite

    docker run --rm --name fragments-ui_vite --env-file .env -p 1234:1234 amerzaian/fragments-ui_nginx:latest

    // For VITE, you need to change the port in the .env and .env.production file to 1234
```

How to run push to Docker Hub:
```bash
For NGINX:
    docker push amerzaian/fragments-ui_nginx:latest
```

SHA256 checksums:
```bash
For Alpine: b89d9c93e9ed3597455c90a0b88a8bbb5cb7188438f70953fede212a0c4394e0
```
