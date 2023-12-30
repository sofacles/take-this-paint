# Take this paint

This is a react app that lets people give away their partial cans of paint after they've finished painting. You can anonymously post a paint, including a picture and there's also a color picker control that lets you pick a 3 (hexadecimal) digit color on a little palette. The system sends you, the donor, a confirmation email and once you click that link, your paint should show up on the site.

The front end is in react, the back end is an Express app written in ts-node. The paints and encrypted emails are stored in MongoDB. I'm resizing the images with multer and storing them in S3.

You can also tell the paint donor that you'd like to take the paint off their hands. Click on a paint, enter your email and message the donor of the paint. After you confirm that email address, the system sends your message to the paint donor.

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

- Unit tests
- Write an API that lets me send paint donors an email with which they can eventually delete their posting
- Some end-to-end Cypress tests

## Notes

I thought about putting fixtures into the cypress tests, which would effectively stub out my addPaint API, but I decided a true E2E actually should write to the DB and my tests should clean up after themselves. Since my data models are in the server project, I could either call a function in server to do that, or move the models into a separate library that could be used by both client and server. A third approach would be to just use the admin pages to delete the newly-added test data. This is slower, but it keeps my code clean for now. In a more complex app it would probably be worth looking at one of the options above.
