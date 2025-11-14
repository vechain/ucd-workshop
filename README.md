<p align="center">
  <a href="https://www.vechain.org/vechainthor/">
    <picture style="padding: 80px;">
        <img src="https://raw.githubusercontent.com/vechain/ucd-workshop/refs/heads/main/.github/project-banner.png" style="padding: 20px;">
    </picture>
  </a>
</p>

## AI Agents on the Blockchain

> This repository was created for the "AI Agents on the Blockchain" workshop in UCD.

Hi there! :wave:

In this workshop we will learn how to interact with the VeChain blockchain using [the VeChain SDK](https://docs.vechain.org/developer-resources/sdks-and-providers/sdk). Armed with this knowledge we will build an AI Agent on [ElizaOS](https://elizaos.ai/) that understands blockchain related user prompts and interacts with the blockchain in real time. 

By the end of the workshop you will have a working agent that answers prompts like `what is my account balance?` and `what is the last transaction for account 0xabcd...?` and you will know how to extend its capabilities to answer even more complex prompts.

## Table of Contents

- [AI Agents on the Blockchain](#ai-agents-on-the-blockchain)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [SDK setup](#sdk-setup)
    - [Agent setup](#agent-setup)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Prerequisites

- A laptop with internet connection
- [VS Code](https://code.visualstudio.com/), or similar code editor
- [NodeJS](https://nodejs.org/en), tested with `v24.11.1`
- [Bun](https://bun.com/docs/installation), tested with `v1.3.2`

### Setup

#### SDK setup

Open your favorite terminal and run the following commands:
```bash
# Navigate the the `sdk` directory
cd sdk
# Install the project dependencies, such as the VeChain SDK
npm install 
```
```bash
# Run the `readBlocks.js` example script
node examples/readBlocks.js
```

If you see the latest block data printed to the terminal at this point, you are ready to go!

Feel free to explore and run more examples scripts.

#### Agent setup

Open your favorite terminal and run the following commands:
```bash
# Navigate to the `agent` directory
cd agent
# Install the ElizaOS CLI
bun i -g @elizaos/cli
# Check the version of the ElizaOS CLI
elizaos --version
# Install the project dependencies
npm install
```

Optional twitter plugin for ElizaOS (requires Twitter API key)
```bash
elizaos plugins add twitter
```

Copy the `agent/.env.example` file to `agent/.env` and:
1. Replace the `OPENAI_API_KEY` with your OpenAI API key. A temporary key will be provided to workshop attendees

```bash
# Run the development server with hot reloading
elizaos dev
```

```bash
# OR start the development server without hot reloading
elizaos start
# Note: When using 'start', you need to rebuild after changes:
    # rm -rf dist 2>/dev/null || rimraf dist
    # bun run build
```

You can also use bun to build and start up the project

```bash
bun run build
bun dev
```

## License

This project is licensed under [MIT License](LICENSE.md).

## Acknowledgements

Special thanks to the following contributors :heart:
- [@alexlofe](https://github.com/alexlofe)
- [@n1no01](https://github.com/n1no01)
- [@kgapos](https://github.com/kgapos)

and the following projects and organizations:
- [VeChain SDK](https://github.com/vechain/vechain-sdk-js)
- [ElizaOS](https://elizaos.ai/)
- [RZLT](https://www.rzlt.io/)