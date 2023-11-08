# Take this paint

This is a react app that lets people give away their partial cans of paint after they've finished painting. You can anonymously post a paint, including a picture and there's also a color picker control that lets you pick a 3 (hexadecimal) digit color on a little palette.

The front end is in react, the back end is an Express app written in ts-node. The paints and encrypted emails are stored in MongoDB. I'm resizing the images with multer and storing them in my static images folder.

The idea is that somebody will be able to send you a mail through Nodemailer with a randomized to and from address, like craigslist does, so the two of you can meet and you can get rid of your paint.

## Update: Nov 8, 2023.

I've got a skeleton version of the app [deployed to an EC2 instance](ec2-35-85-38-117.us-west-2.compute.amazonaws.com), but I'm investigating some issues with uploading photos. Like they say, "it works on my machine". I suspect it's something that Vite was handling for me at dev time through its `publicDir` property, but I also might have nginx configured wrong. I wanted to get something deployed so I could have a real URL to associate with an SSL cert. Once the site is on https, I hope to get the mail-relay stuff working.

Last week, moved from my hand-written css to tailwind.
