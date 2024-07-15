# fragments-ui

How to run in Docker:

```bash
For NGINX:
    docker run --rm -p 80:80 amerzaian/fragments-ui_nginx

For VITE:
    docker run --rm -p 1234:1234 amerzaian/fragments-ui_vite
```

How to run compile Docker image:
```bash
For NGINX:
    docker build -t amerzaian/fragments-ui_nginx -f Dockerfile.nginx .

For VITE:
    docker build -t amerzaian/fragments-ui_vite -f Dockerfile.vite .
```

SHA256 checksums:
```bash
For Alpine: b89d9c93e9ed3597455c90a0b88a8bbb5cb7188438f70953fede212a0c4394e0

