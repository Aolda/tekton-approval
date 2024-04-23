# tekton config.json 설정 방법

### project

제작한 서비스가 소속될 프로젝트

options
- aolda
- cloud
- craft

example
```json
"project": "cloud"
```

### image

제작한 서비스의 이름

example
```json
"image": "docs"
```

### dockerfile

레포지토리의 root 경로를 기준으로 Dockerfile의 상대경로

example
```json
"dockerfile": ".deploy/Dockerfile"
```

### context

빌드할 컨텍스트

example
```json
"context": "./"
```

### platform

빌드할 플랫폼

options
- linux/amd64
- linux/arm64/v8
- linux/amd64,linux/arm64/v8

example
```json
"platform": "linux/amd64,linux/arm64/v8"
```

### replicas

pod의 복제본의 개수

example
```json
"replicas": 2
```

### port

pod에 접근할 수 있는 포트 번호

example
```json
"port": 3000
```
