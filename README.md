# DHBW Stundenplan Tool
This is the repository for the DHBW Stundenplan Tool (Stunden-Buddies).

It is a web application that allows students to see their timetable in a more user-friendly way than the official DHBW website.

There is no guarantee for the correctness of the data displayed by this tool.
The data is fetched from the official DHBW website but may be cached on the server, to reduce traffic.

## Contribute
If you want to contribute to this project, please follow the steps below.
You need to have Bun installed on your machine, this project should not be used with npm or yarn.

You can install bun from the official website: [https://bun.sh/](https://bun.sh/)

This project uses the Next.js framework, so you should be familiar with it.

### Installation
To install the project, clone the repository and run the following command in the project directory:
```bash
bun install
```

### Development
To run the development server, use the following command:
```bash
bun --bun run dev
```
The `--bun` flag is necessary to run the project with bun's integrated web server, which is much faster than the default Node.js server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Code Style
This repository abides by the Google TypeScript Style Guide, and is enforced by ESLint and Prettier.
Please make sure to run the linter before committing your changes.

```bash
bun run lint
```

## Running
This project provides a Docker image to run the application in a container.
It is automatically build on GitHub and pushed to the GitHub Container Registry.

To run the container, use the following command:
```bash
docker run -p 3000:3000 ghcr.io/herobone/dhbw-stundenplan-tool:latest
```

## License
This project is licensed under BSD 3-Clause License. See the [LICENSE](LICENSE) file for details.

The data fetched from the DHBW website is property of the DHBW and their license applies to it.
There is ABSOLUTELY NO WARRANTY for the correctness of the data displayed by this tool. Use at your own risk.

