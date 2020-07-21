# Notion CRON

A toolkit to provide to ability to back-up a Notion workspace through a CRON job. The back-up will be pushed to a git repo to provide a history of the Notion workspace.

**What**

- Run a CRON each day to do a specific action

**Actions**

1. Use puppeteer to log in to the Notion Web page
2. Goto Workspace
3. Goto Settings & Members > Settings > Export Content

![Notion%20CRON%20b386d59ca5954eff9bd8ebf2f2ba6357/Untitled.png](Notion%20CRON%20b386d59ca5954eff9bd8ebf2f2ba6357/Untitled.png)

**Goal**

- Download (+ push to git) RAW data (Markdown, CSV, images)
- Download (+ push to git) HTML to be served on GitHub pages (behind auth if possible).

**Result**

The git history should will be very useful for the workspace formatted in Markdown. The HTML files will be should be used for a better viewing / browsing experience.

## Notes / Ideas

- HTML result styling not 100% → might tweak
- HTML result href not having correct links
- HTML doesn't include navigation or project overview → Create **Notion Reader wrapper** around the HTML files
- Check if the hashes change on the file names, if so this will also need to be tweak to have a good git history / diff experience.
- Code snipper parser