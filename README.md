# @node-ts/bus-starter

A starter project for @node-ts/bus for building distributed message based systems with node.

## Why?

[@node-ts/bus](https://node-ts.github.io/bus/) is focussed on helping build distributed systems in node based on messaging patterns that are reliable, scalable and fault tolerant. Applications built this way can:

* survive restarts and downtime
* handle bursty loads
* scale in and out easily
* survive network interuptions
* tolerate external API outages
* easily be refactored from monolith to microservice

All without losing data. This makes message based systems a great choice where reliability and data integrity is key.

However, building distributed message based applications isn't simple. At its heart, this project uses the service bus from [@node-ts/bus](https://node-ts.github.io/bus/) that encapsulates many of the complexities when dealing with messaging technologies and approaches. 

Your code stays cleaner, as only business logic related code needs to be written. Concerns on how a message is dispatched, routed, received, processed, retried etc are all handled by the underlying framework. This remains true regardless if the app operates in a single process in memory, or runs with many services and instances across many compute instances.

### What's included

This starter project contains the following packages preconfigured and in a runnable state:

* `@node-ts/bus-core` - The core service bus that manages sending, routing, dispatch, retries etc
* `@node-ts/bus-workflow` - Enables workflow/saga definitions to be written that coordinate higher-order business processes
* `@node-ts/logger-core` - A generic log abstraction that allows consumers to use their preferred logger
* `@node-ts/logger-winston` - An adapter used to log messages using winston
* `inversify` - An IoC framework for Typescript used to manage dependency injection

## Installation

This repository should be cloned or forked into your own repository:

```bash
git clone https://github.com/node-ts/bus-starter my-bus-app
cd my-bus-app
git remote set-url origin <your git repo>
```

Then install the dependencies
```bash
npm i
```

Once done, run the following command and observe the log output:
```
npm run dev
```

At this point you can remove the existing messages/handlers/workflows and start implementing your own. Before moving to production, be sure to do the following tasks:

* install a [durable transport](https://node-ts.github.io/bus/packages/bus-core/src/transport/)
* install a [durable persistence](https://node-ts.github.io/bus/packages/bus-workflow/src/workflow/persistence/)

These steps are crucial to ensuring your appliation is resilient and scalable

## Scripts

The following scripts are available as part of the starter project:

* `build` - transpiles the code to `/dist`
* `dev` - transpiles, runs and watches for code changes
* `dev:rebuild` - transpiles and runs the app
* `lint` - runs linting based on [@node-ts/code-standards](https://github.com/node-ts/code-standards)
* `lint:fix` - attempts to fix linting violations

## Running

A small implementation of a distributed application has been made to demonstrate a generic project structure. This should be removed and replaced with your implementation. 

The example used is testing sirens for correct operation (such as in a building fire alarm test). When a siren is tested, it publishes an event depending on success or failure. If a failure event is published, a workflow coordinates the sending of an email to the maintenance team to fix the siren.

This is a basic demonstration, but it shows how distributed systems can stay decoupled. By publishing an event that the siren is broken and orchestrating the remediation steps in a workflow, all commands of the system can adhere to the single responsibility principle and be reused without side effects.

## Further Information

For more information on how to use the service bus, visit [@node-ts/bus](https://node-ts.github.io/bus/).

If you're interested in Domain Driven Design to help design your code that reduces complexity, have a look at [@node-ts/ddd](https://github.com/node-ts/ddd) which integrates seamlessly with the service bus.

## License

The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.