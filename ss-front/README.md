# SuperShare
&nbsp;
# About
<p>A simple project aimed at sharing text files / links between 2 registered devices. </p>
<p>The idea took form when I had to send small files/links from my mobile to my PC and vice-versa. I really got annoyed by that.</p>
&nbsp;

## <b>>>> UNDER DEVELOPMENT</b>

...

#
&nbsp;
# Project composition
* ### MySQL
* ### RabbitMQ
* ### NodeJs + Express
* ### React

#
&nbsp;
# Requirements
* ### Docker (v20.10)
* ### Docker Compose (v1.29)
* ### NodeJs (v18.13)

#
&nbsp;
# Starting it all up

<p> This project was designed to run entirely on docker containers. That being said, it is still necessary having nodeJs installed in order to build the projects.</p>

...

&nbsp;

#

# TL; DR:
* ## Clone this repo;
* ## cd into ss-front, 'npm install' and 'npm run build';
* ## go back to root directory;
* ## Configure env file with desirable IPs for the apps;
* ## Configure port-forwarding so your external IP will route requests to the correct address;
* ## run 'npm run start';

&nbsp;

<p>At this point, there should be 4 docker containers up and running on your machine.</p>
<p>Navigate to the <b>FRONT</b> IP in order to access it.</p>
...