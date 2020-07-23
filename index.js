const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const core = require('@actions/core');

/* Helpers */
const asyncTimeout = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const getResponseData = response => {
    if (response.ok) return response.json();

    core.setFailed(`fetch failed with status: ${response.status}`);
}

/* Action */
(async () => {
    try {
        /* Inputs */
        const notionCookie = core.getInput('notion_cookie');
        const notionSpaceId = core.getInput('notion_space_id');
        const notionExportType = core.getInput('notion_export_type');

        core.info(`notionExportType ${notionExportType} | notionCookie ${notionCookie} | notionSpaceId ${notionSpaceId}`);

        /* enqueueTask */
        const enqueueTaskRequest = {
            url: 'https://www.notion.so/api/v3/enqueueTask',
            options: {
                method: 'POST',
                body: `{"task":{"eventName":"exportSpace","request":{"spaceId":"${notionSpaceId}","exportOptions":{"exportType":"${notionExportType}","timeZone":"Europe/Brussels","locale":"en"}}}}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': notionCookie
                }
            }
        };

        const enqueueTaskResponse = await fetch(enqueueTaskRequest.url, enqueueTaskRequest.options);
        const enqueueTask = await getResponseData(enqueueTaskResponse);
        const { taskId } = enqueueTask;
        core.info(`taskId ${taskId}`);

        /* Wait */
        await asyncTimeout(10000);

        /* getTask */
        const getTasksRequest = {
            url: 'https://www.notion.so/api/v3/getTasks',
            options: {
                method: 'POST',
                body: `{"taskIds":["${taskId}"]}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': notionCookie
                }
            }
        };

        const getTasksResponse = await fetch(getTasksRequest.url, getTasksRequest.options);
        const getTasks = await getResponseData(getTasksResponse);
        const { exportURL } = getTasks.results[0].status;
        core.info(`exportURL ${exportURL}`);

        core.setOutput('notion_url', exportURL);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
