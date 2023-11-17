# Take this paint

This is a react app that lets people give away their partial cans of paint after they've finished painting. You can anonymously post a paint, including a picture and there's also a color picker control that lets you pick a 3 (hexadecimal) digit color on a little palette.

The front end is in react, the back end is an Express app written in ts-node. The paints and encrypted emails are stored in MongoDB. I'm resizing the images with multer and storing them in my static images folder.

The idea is that somebody will be able to send you a mail through Nodemailer with a randomized to and from address, like craigslist does, so the two of you can meet and you can get rid of your paint.

## Update: Nov 9, 2023.

I've got a skeleton version of the app [deployed to an EC2 instance](http://ec2-35-85-38-117.us-west-2.compute.amazonaws.com), but I'm investigating some issues with uploading photos. Like they say, "it works on my machine". I suspect it's something that Vite was handling for me at dev time through its `publicDir` property, but I also might have nginx configured wrong. I wanted to get something deployed so I could have a real URL to associate with an SSL cert. Once the site is on https, I hope to get the mail-relay stuff working.

Last week, moved from my hand-written css to tailwind.

## Update Nov 17, 2023

OK, most everything is tailwindified and I decided that I was thinkig about vite wrong. It's a static site builder. I think adding pictures after build time and them having them be instantly visible just isn't what it was designed for. Now I'm storing images in an S3 bucket where the objects are all readable.

This is configured so it can run on nginx in prod. If you run this locally, you'll need the fetch calls to start with "server" instead of "api". Same for the `app.use()`s and `app.get()`s in `server/index.ts`;

## Screenshots

### View paints

![View paints](https://raw.githubusercontent.com/sofacles/take-this-paint/main/server/md_images/ViewPaints.png)

### Posting a paint, using the color picker

![Using the color picker while POSTing a paint](https://raw.githubusercontent.com/sofacles/take-this-paint/main/server/md_images/ColorPicker.png)

### Same thing, but at the mobile breakpoint

![Using the color picker while POSTing a paint on a mobile device](https://raw.githubusercontent.com/sofacles/take-this-paint/main/server/md_images/ColorPickerMobile.png)

![A custom combobox](https://raw.githubusercontent.com/sofacles/take-this-paint/main/server/md_images/CustomValue.png)

![error handling on the client with react-hook-form](https://raw.githubusercontent.com/sofacles/take-this-paint/main/server/md_images/usingUseForm.png)

## Where are the unit tests?

Unit tests are coming. My (shameful) lack of unit tests makes me have to spend way too much time manually testing every time I change something.

## Roadmap

- Start using dotenv, get rid of my config file
- Fix the casing on the form labels
- Get a domain and an SSL cert
- Get gmail API working with said cert
- Unit tests
- Write an API that lets me send paint donors an email with which they can eventually delete their posting
- Some end-to-end Cypress tests
