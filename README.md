# GradeProjectionTool
Online grade prediction tool for use of charity organisation.

* [Pre-requisites](#pre)
* [Using NPM](#npm)
* [AWS Access](#aws)
* [Deployment](#deployment)

# <a name="pre"></a> Pre-requisites
### AWS-CLI Tools
Installing AWS-CLI tools. Follow the instructions [here](https://aws.amazon.com/cli/).

Next, find your AWS Access Key. Log into your account on the [AWS Console](https://xanndarr.signin.aws.amazon.com/console).
Navigate to `Identity & Access Management` > `Users` > `USERNAME` > `Security Credentials`.

Hit the `Create Access Key` button. Download these credentials and store them as your secret key will not be displayed again.

Then run:

`aws configure`

Follow the on screen prompts, entering your Access Key and Secret Access Key. Leave everything else as default (skip with Enter).

### NVM
Install NVM using Brew, Apt or [script](https://github.com/creationix/nvm#install-script).

`nvm use`

# <a name="npm"></a> Using NPM

To install packages:

`npm install` or `npm i`

Run any of the scripts found in package.json:

`npm run SCRIPT`

### Available scripts

`start` - Start web server

`lint` - Lint your html code

`deploy` - Deploy to the web

# <a name="aws"></a> AWS Access
You can log into the AWS Console [here](https://xanndarr.signin.aws.amazon.com/console).

# <a name="deployment"></a> Deployment
Make sure you have installed everything from the pre-requisites stage. Then run:

`npm run deploy`

This should push your code up to AWS to test on other devices.

You can view the page [here](http://projection-tool.s3-website-eu-west-1.amazonaws.com/).
