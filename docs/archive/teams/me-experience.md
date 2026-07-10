# Me Experience in Microsoft Teams using Microsoft Graph Tookit and SPFx
<!-- <span style="color:grey">Published on  09/11/2020</span> -->
<span style="color:grey">Updated on  10/06/2021</span>

Create the [Me Experience](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-me-experience/?WT.mc_id=m365-10690-rwilliams) as explained in the blog by [Waldek Mastykarz](https://twitter.com/waldekm) using [Microsoft Graph Tookit with React](https://docs.microsoft.com/en-us/graph/toolkit/get-started/use-toolkit-with-react/?WT.mc_id=m365-10690-rwilliams) and SPFx

This blog is a short walkthrough of the sample created for the Me Experience with the [Combine multiple web parts in a single tab of a personal Teams app](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-me-experience/?WT.mc_id=m365-10690-rwilliams#combine-multiple-web-parts-in-a-single-tab-of-a-personal-teams-app) approach

The sample covers: 

- [Microsoft Graph Open Extensions](https://docs.microsoft.com/en-us/graph/api/resources/opentypeextension?view=graph-rest-1.0&amp;WT.mc_id=m365-10690-rwilliams)
- [Microsoft Graph Tookit with React](https://docs.microsoft.com/en-us/graph/toolkit/get-started/use-toolkit-with-react/?WT.mc_id=m365-10690-rwilliams)
- [Build Microsoft Teams tab using SPFx](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab?WT.mc_id=m365-10690-rwilliams)

The finished app
![me-experience](./images/me-experience.gif)

## Personal App for Me Experience

The sample gives you 3 tabs for a Personal App in Microsoft Teams, using mgt-react package for components

- Planning
- Insights
- Settings 

### Planning

Uses Agenda, Tasks, and FileList components from [Microsoft Graph Tookit with React](https://docs.microsoft.com/en-us/graph/toolkit/get-started/use-toolkit-with-react/?WT.mc_id=m365-10690-rwilliams)

> [MGT-Files](https://github.com/microsoftgraph/microsoft-graph-toolkit/issues/703) is here 🎉 so I have updated the code to use [FileList](https://docs.microsoft.com/en-us/graph/toolkit/components/file-list?WT.mc_id=m365-33182-rwilliams)

### Insights

Uses [FileList](https://docs.microsoft.com/en-us/graph/toolkit/components/file-list?WT.mc_id=m365-33182-rwilliams) to display the list of files.

### Settings

Personal Apps in Teams do not have configuration settings as in a regular `SPFx` webpart. And often we might want to configure few things. 
For e.g here , the app shows me my upcoming meetings for the next 8 days, may be I want to see it for just the next 5 days then I should be able to configure this.</p>

For this personalised configuration, we have a variety of option, you can see [here](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-configure-in-teams/?WT.mc_id=m365-10690-rwilliams#choose-the-location-to-store-users-configuration)
Here we have used [Microsoft Graph Open Extensions](https://docs.microsoft.com/en-us/graph/extensibility-overview/?WT.mc_id=m365-10690-rwilliams)
Right now it only has one setting, the number of days passed to the Agenda component to bring back events, but we will be upgrading this to more as the need arise.

Find full source [here](https://github.com/rabwill/tab-spfx-me-experience) 

### SPFx Library for MGT

Another update I have also done in this project is to use [SPFx Library for mgt](https://docs.microsoft.com/en-us/graph/toolkit/get-started/mgt-spfx?WT.mc_id=m365-33182-rwilliams), `mgt-spfx-2.2.0.sppkg` file in my SP app catalog and in code,  to prevent multiple components from registering their own set of MGT components on the page, which did not work on SharePoint pages previously. This is just amazing news for SP devs!

The app respects themes chosen by users in `Teams`, thanks to this article by [Joao Mendez](https://joaojmendes.com/2020/04/14/microsoft-graph-open-extensions/) a lot of work was simplified for this sample , kudos to you 👏🏽


<script async src="https://www.googletagmanager.com/gtag/js?id=UA-146817327-1">
</script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-146817327-1');
</script>
