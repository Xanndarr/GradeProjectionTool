# GradeProjectionTool
Online grade prediction tool for use of charity organisation.

#Pre-requisites
Installing AWS-CLI tools. Follow the instructions [here](https://aws.amazon.com/cli/).

Next, find your AWS Access Key. Log into your account on the [AWS Console](https://xanndarr.signin.aws.amazon.com/console).
Navigate to `Identity & Access Management` > `Users` > `USERNAME` > `Security Credentials`.

Hit the `Create Access Key` button. Download these credentials and store them as your secret key will not be displayed again.

Then run:

`aws configure`

Follow the on screen prompts, entering your Access Key and Secret Access Key. Leave everything else as default (skip with Enter).

# AWS Access
You can log into the AWS Console [here](https://xanndarr.signin.aws.amazon.com/console).

# Deployment
Make sure you have installed everything from the pre-requisites stage. Then run:

`./deploy`

This should push your code up to AWS to test on other devices.

You can view the page [here](http://projection-tool.s3-website-eu-west-1.amazonaws.com/).
