```markdown
Syntax highlighted code block

# Header 1

## Header 2

### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

#Server Side Rendering(SSR) with Angular Universal

###What is SSR?

<!-- Typical Angular application is a Single-Page Application (SPA) where the rendering happens on the client side(i.e., Browser). The process of rendering the application on the server is referred as Server Side Rendering(SSR). -->

A normal Angular application executes in the browser, rendering pages in the DOM in response to user actions. Angular Universal executes on the server, generating static application pages that later get bootstrapped on the client. This means that the application generally renders more quickly, giving users a chance to view the application layout before it becomes fully interactive.

###Why SSR?

There are three main reasons to create a Universal version of your app.

1. Facilitate web crawlers through search engine optimization (SEO)
2. Improve performance on mobile and low-powered devices
3. how the first page quickly with a first-contentful paint (FCP)

###Facilitate web crawlers (SEO)

Google, Bing, Facebook, Twitter, and other social media sites rely on web crawlers to index your application content and make that content searchable on the web. These web crawlers may be unable to navigate and index your highly interactive Angular application as a human user could do.

Angular Universal can generate a static version of your app that is easily searchable, linkable, and navigable without JavaScript. Universal also makes a site preview available since each URL returns a fully rendered page.

###Improve performance on mobile and low-powered devices

Some devices don't support JavaScript or execute JavaScript so poorly that the user experience is unacceptable. For these cases, you may require a server-rendered, no-JavaScript version of the app. This version, however limited, may be the only practical alternative for people who otherwise couldn't use the app at all.

###Show the first page quickly

Displaying the first page quickly can be critical for user engagement. Pages that load faster perform better, even with changes as small as 100ms. Your app may have to launch faster to engage these users before they decide to do something else.

With Angular Universal, you can generate landing pages for the app that look like the complete app. The pages are pure HTML, and can display even if JavaScript is disabled. The pages don't handle browser events, but they do support navigation through the site using routerLink.

In practice, you'll serve a static version of the landing page to hold the user's attention. At the same time, you'll load the full Angular app behind it. The user perceives near-instant performance from the landing page and gets the full interactive experience after the full app loads.

##Lets get started with SSR Implementation

**Step 1**

Let's create a new angular project, You can skip this step if you already have an existing project.

```
ng new angular-universal-project
```

**Step 2**

Adding angular universal to our application. `angular-universal-project` in the below CLI is your project name that you created in step1.

```
ng add @nguniversal/express-engine --clientProject angular-universal-project
```

You’ll notice this schematic made several changes to your app, modifying some files and adding some files. I’ll briefly go through these in no particular order.

1. `angular.json`: `projects.{{project-name}.architect.build.options.outputPath` changes to `“dist/browser”`; and a new `projects.{{project-name}}.architect` is added, called “server”. This lets the Angular CLI know about our server/Universal version of the Angular application.

2. `package.json`: besides adding a few new dependencies (to be expected), we also get a few new scripts: `“compile:server”`, `“server:ssr”`, `“build:ssr”`, `“build:client-and-server-bundles”`.

3. `server.ts`: this is the NodeJS Express server. Obviously, you don’t have to use this exact server setup as generated, although make note of the line `app.engine('html', ngExpressEngine({...'. ngExpressEngine` is a wrapper around `renderModuleFactory` which is the special sauce that makes Universal work. If you don’t use this exact server.ts file for your set-up, at least copy this part out and integrate it into yours.

4. `webpack.server.config.js`: the webpack configuration for bundling the Express/Universal server. Again, if you are integrating Universal in an existing app, you might be doing something different. However, since we’ve added our Universal module to the server, which has the whole dependency graph of Angular, this makes a tidy bundle of everything that’s needed for a production build. The configuration is used in conjunction with the new `package.json` script `“compile:server”`.

5. `main.ts`: this has been modified so that the browser version of the app won’t start bootstrapping until the Universal-rendered pages have been fully loaded.

6. `main.server.ts`: this new file basically only exports the `AppServerModule`, which is the entry point of the Universal version of the application. We’ll see this soon.
   `tsconfig.server.json`: this tells the Angular compiler where to find the entry module for the Universal application.

7. `app.module.ts`: modified to execute the static method `.withServerTransition` on the imported `BrowserModule`. This tells the browser version of the application that the client will be transitioning in from the server version at some point.

8. `app.server.module.ts`: this is the root module for the server version only. You can see it imports our `AppModule`, as well as the `ServerModule` from `@angular/platform-server`, and bootstraps the same `AppComponent` as `AppModule`. AppServerModule is the entry point of the Universal application.

**Step 3**

We have successfully added angular universal in our project. Now, lets try to run the application.

```
npm run build:ssr && npm run serve:ssr
```

Once the build is successful, you can view your application running in `http://localhost:4000` (or whatever port is configured for you).

##How to check SSR is working or not?
Assume that SSR is implemented and build happend without any issues and you could see the application running on the browser. But how do we know that the application running is actually SSR or angular default SPA one.

To check this, you should check the `Page Source`. How to see the `Page Source`, right click -> `View Page Source` simple as that.

Now

##Things you need to take care of
##Angular Universal "GOTCHAS"

###Sources
[Angular documentation](https://angular.io/guide/universal)
[alligator.io](https://alligator.io/angular/angular-universal/)
