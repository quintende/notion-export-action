const core = require('@actions/core');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const notionCookie = core.getInput('notion_cookie');
    const notionSpaceId = core.getInput('notion_space_id');
    core.info(`notionCookie ${notionCookie} | notionSpaceId ${notionSpaceId}`);

    fetch("https://www.notion.so/api/v3/enqueueTask",  {
      method: 'POST',
      body: '{"task":{"eventName":"exportSpace","request":{"spaceId":"5c94e789-31b9-4416-aeb8-b7d1607432aa","exportOptions":{"exportType":"markdown","timeZone":"Europe/Brussels","locale":"en"}}}}',
		  headers: {
        'Content-Type': 'application/json',
        'Cookie': '__cfduid=d2ead3fcda3e9dfcfe246197b71be77d41593268635; notion_browser_id=ddcc63c9-7af3-4b2e-a3cd-9e41b842ed9a; notion_locale=en-US%2Flegacy; token_v2=a58d29141d98a6cd7dd06b25775eb5b25c7ad7bc640ab9b410b7f801111ee28624ef3dd23ddd1c10a8052c7565eb41860c70785b721d5d89b03aed9f787446f8a39ba7d72830a59dbc38cf0c2a36; notion_user_id=40b44116-408c-472e-aca6-16a0847c5654; notion_users=%5B%2240b44116-408c-472e-aca6-16a0847c5654%22%5D'
        }
      })
      .then(response => {
          if(response.ok){
              return response.json();
          }
          core.setFailed(`fetch failed with status: ${response.status}`);
      })
      .then(data => {
          console.log(`successfully saved data ${JSON.stringify(data)}`);
          setTimeout(() => {
            fetch("https://www.notion.so/api/v3/getTasks",  {
              method: 'POST',
              body: `{"taskIds":["${data.taskId}"]}`,
              headers: {
                'Content-Type': 'application/json',
                'Cookie': '__cfduid=d2ead3fcda3e9dfcfe246197b71be77d41593268635; notion_browser_id=ddcc63c9-7af3-4b2e-a3cd-9e41b842ed9a; notion_locale=en-US%2Flegacy; token_v2=a58d29141d98a6cd7dd06b25775eb5b25c7ad7bc640ab9b410b7f801111ee28624ef3dd23ddd1c10a8052c7565eb41860c70785b721d5d89b03aed9f787446f8a39ba7d72830a59dbc38cf0c2a36; notion_user_id=40b44116-408c-472e-aca6-16a0847c5654; notion_users=%5B%2240b44116-408c-472e-aca6-16a0847c5654%22%5D'
                }
              }).then(response => {
                if(response.ok){
                    return response.json();
                }
                core.setFailed(`fetch failed with status: ${response.status}`);
            })
            .then(data => {
                console.log(`2: successfully saved data ${JSON.stringify(data)} ${data.results[0].status.exportURL}`);
                core.setOutput('url', data.results[0].status.exportURL);
            })
            .catch(error => core.setFailed(error.message));
          }, 10000);

      })
      .catch(error => core.setFailed(error.message));
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();