# Me Experience as a bot in Microsoft Teams using Bot Composer
<span style="color:grey">Published on  14/03/2021</span>

If you have been following my blogs, you know that I have created an [SPFx webpart](https://rabiawilliams.com/teams/me-experience/) which was used as a Personal app in Microsoft Teams,  which gives you the [Me Experience](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-me-experience/?WT.mc_id=m365-20710-rwilliams) as explained in the blog by [Waldek Mastykarz](https://twitter.com/waldekm).

For a long time I have been thinking of giving you a bot that does something similar. While it is still a work in progress, I thought I would share with you the basics on how to get started with bots in Microsoft Teams using bot composer to build a ME bot. This time again, we are going to connect to `Microsoft Graph` to get data about the user. 

This bot currently will get upcoming meetings of the logged in user.

Last week, I spent some time with my colleagues ([Bob German](https://twitter.com/Bob1German) and [Waldek Mastykarz](https://twitter.com/waldekm)) for a hack week in my team. And we built a personal assistant bot which we will soon be sharing with you! 
Kudos to these two, we learned a lot from each other.

But first thing first, let's build a basic bot that connects to `Microsoft Graph` which will get you next meetings listed out for you, from your calendar.

## Tools needed 

There are some tools you need in your dev environment to get started 🛠.

- [Bot Composer](https://docs.microsoft.com/en-us/composer/install-composer?WT.mc_id=m365-20710-rwilliams)
- [Bot Emulator](https://github.com/Microsoft/BotFramework-Emulator#readme)
- [Azure Subscription](https://azure.microsoft.com/en-au/free/?WT.mc_id=m365-20710-rwilliams) (for Bot Services, and LUIS)
- Set up [ngrok](https://ngrok.com/docs)

## Azure Side of things 🌩


If you are familiar with [Bot channels registration](https://docs.microsoft.com/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-4.0&WT.mc_id=m365-20710-rwilliams) then you can skip to next section or stay with me here otherwise.

-  In Azure portal [htts://portal.azure.com](htts://portal.azure.com), Search for **Bot Services**.
- Create new **Bot Channel Registration** from the choices.

    ![bot channel registration](./images/01-bot-channel-search.png)

- Fill in the bot details, make sure you have an active subscription. The messaging end point is what you will be tunneling the local project using ngrok. Add `/api/messages` to the ngrok url.

    ![bot-fill-in](./images/02-fill-bot-rego.png)

- Once created, on the left nav, choose channels and add a featured channel for `Microsoft Teams`

    ![configure-teams](./images/03-configure-teams.png)

- Further along, you will be asked to agree to **Terms of Service**, Agree and proceed.

- In the left nav, select **Configure** and you will see the below window, here you will **manage** the appId and secret that you will use in your bot.

    ![04-configure-app-bot](./images/04-configure-app-bot.png)

- When you click on the **Manage** link shown above, you will be taken to the app that was registered as part of the `Bot channel registration`. Copy the appID, Application(client)ID which is in the **Overview** page as shown in the below screen. Also copy the Directory(tenant)ID. Make sure here you also create a secret for this app. Copy it somewhere to use later.

    ![05-configure-appid](./images/05-configure-appid.png)

    ![08-secret](./images/08-secret.png)

- In the app registration's overview page click on the **Add a Redirect URI** link to set the redirect URI. 
- Add a **Web** platform, by clicking on the **Add a platform** link and choosing **Web** among the platforms as shown below.
    ![06-configure-platform](./images/06-configure-platform.png)

- The redirect URL will be `https://token.botframework.com/.auth/web/redirect`. Make sure you enable Implicit grand and hybrid flow by checking both **Access tokens** and **ID tokens**.

    ![07-configure-web](./images/07-configure-web.png)

I know this was a lot, but we are almost there 😀

## Luis side of things ⁉

You will need to set up a new app in LUIS and use it's info in the Bot Composer as we are using LUIS to interpret the intent of the bot. For e.g when you ask your bot a question it is a trigger phrase and this is then interpreted using LUIS to give back results.

- Go to LUIS [https://www.luis.ai/](https://www.luis.ai/) 
- Make sure you have set up the authoring resource with your Azure subscription.

    ![09-authoring-luis](./images/09-authoring-luis.png)

- Create a new app under the this authoring resource

    ![10-create-app](./images/10-create-app.png)

- Copy the LUIS region and LUIS authoring key as below, you will need it later for Bot Composer settings.

    ![11-LUIS-settings](./images/11-LUIS-settings.png)

Seems like that was easy 👍

## Graph connection side of things

Your bot needs to talk to Graph. In our SPFx webpart we had it easy with Microsoft Graph Toolkit component. Here, we have to set things up.

- Go to the configuration page of the Bot Channel Registration, and select the Add OAuth Connection Settings button.

    ![12-configure-oauth](./images/12-configure-oauth.png)

- Fill out the connection settings as shown below, you will use the appId, secret and the tenantId you copied from the app registration you did earlier to fill this connection settings.

    ![13-graph-connection](./images/13-graph-connection.png)

For now, our ME bot only reads user's calendar so under scope we can mention `Calendars.Read`, we can adjust the scope as we extend the bot to do more.
You can have all scopes in one connection (separated by space), or multiple connection with unique scopes incase you want to do dynamic consent.

## Source code side of things

- Go to my source code [https://github.com/rabwill/bot-me-experience](https://github.com/rabwill/bot-me-experience) and clone the project.
- Open this project's root folder `bot-me-experience` in Bot Composer (You will see an **Open** button on top)
- Go to the settings of the Bot Composer.
- Fill in the appId, secret, LUIS authoring key and LUIS region as shown below. You had previously copied these.
    ![14-bot-composer-settings](./images/14-bot-composer-settings.png)

## Testing with Bot emulator

- The bot is configured to be tested locally.
- Start the bot

    ![15-start-bot](./images/15-start-bot.png)

- Choose **Test in emulator** as shown below. Allow access if you get a security alert.

    ![16-allow](./images/16-allow.png)

- Type `My next meetings` in the chat in the emulator and hit send.

    ![17-typed](./images/17-typed.png)

- You will get the the **Login** button to give permission for the app to read your calendar.
- Select login, and complete the sign in process.
- Once done you will see the meetings shown to you (make sure you have up coming meetings to test this) 

    ![18-meetings-shown](./images/18-meetings-shown.png)


Your ME bot is working and it's magic. 😀🎉 Not a single line of code so far.

## Testing ME bot in Microsoft Teams

Now the final part of our exercise is to get this up and running in Microsoft Teams.

- Go to Microsoft Team's app studio and create a new app.

    ![19-app-studio](./images/19-app-studio.png)

- Fill out the App details (name of the app etc..)

- Under **Capabilities**,  select **Bot**, select **Set up**.

    ![20-bot-setup](./images/20-bot-setup.png)

- Select **Existing bot** and paste the appId used before here, and select scope **Personal**.

    ![21-existing-bot](./images/21-existing-bot.png)

- Under **Finish**, select **Domains and permissions**, add `token.botframework.com` under valid domains.

    ![22-valid-domains](./images/22-valid-domains.png)

You have successfully created a Teams application for the ME bot 🐱‍👤. Let's test it.

- Make sure you have started the bot in the Bot Composer.
- Tunnel the localhost which you probably noticed is in port 3980. Use below script to ngrok.
 
```
ngrok http 3980 
```

If you are using a purchased subdomain then use below script

```
ngrok http 3980 -subdomain <subdomain-name-here>
```

I have used a subdomain called `cda`.
If you don't have a subdomain, the url  may look something like ` https://bb48526b33ca.ngrok.io `

- Make sure you copy the ngrok url and update it in the Bot channel registration page in Azure Portal.

    ![23-ngrok](./images/23-ngrok.png)

- Go to the app studio and under **Finish**, select **Test and distribute**.
- Install the app and you will be taken to a chat with the bot.
- The chat experience will be similar to what you experienced in Bot Emulator.
- Here is how it will look.

    ![24-me-bot-final](./images/24-me-bot-final.png)

## How did the magic work?

Open the project in the Bot Composer and go to the trigger `MyMeetings`.
Triggers fire when a particular trigger phrase matches the intent, here intent is `MyMeetings`.
When the user sent a message `My next meetings` in the chat, and the trigger gets fired. 

![29-triggers](./images/29-triggers.png)

Each trigger has a dialog as shown below, this is where all the logic reside- the authentication using the OAuth connection we set up before, the graph API calls and responses from ME bot.
They are all built in actions, just like `Power Automate`.
We have used adaptive cards to send the bot response with the meeting information.

![25-process](./images/25-process.png)

The adaptive card used to display the meetings,  is in the `Bot response` of the Bot Composer.
![26-bot-response](./images/26-bot-response.png)

The `show code` feature is quite useful when you want to see the code behind it and make changes to the adaptive card.
![27-show-code](./images/27-show-code.png)

Here you will see a function `MeetingAdaptiveCard` which takes parameter response coming from Graph API call, and generate the Adaptive card with the response data.
![28-code-ac](./images/28-code-ac.png)

It is a bit tedious to write adaptive cards in an editor like this, hopefully it will get better and we will be able to see previews. 

## Conclusion

There is still a lot to improve in the Bot Composer but I can see a lot of potential in this tool. Many bot applications with simple and straight forward workflows can be easily built using this low code tool.

I hope I have at least put some curiosity in building bots in Microsoft Teams using the Bot Composer. 
There is so much more I'd like to cover, but let's stop for now. Building a bot within few hours is powerful. We can do so much more and not a single line of code was written by the developer. Watch this space to learn more about bots and Bot Composers. I will also add new capabilities to ME bot, so watch this space!

Till then take care 😊


<script async src="https://www.googletagmanager.com/gtag/js?id=UA-146817327-1">
</script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-146817327-1');
</script>
