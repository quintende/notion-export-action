const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const core = require('@actions/core');

const asyncTimeout = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const getResponseData = response => {
    if (response.ok) return response.json();

    core.setFailed(`fetch failed with status: ${response.status}`);
}

async function run() {
    try {
        const notionCookie = core.getInput('notion_cookie');
        const notionSpaceId = core.getInput('notion_space_id');
        const notionExportType = core.getInput('notion_export_type');

        core.info(`notionExportType ${notionExportType} | notionCookie ${notionCookie} | notionSpaceId ${notionSpaceId}`);

        const enqueueTaskResponse = await fetch("https://www.notion.so/api/v3/enqueueTask", {
            method: 'POST',
            body: `{"task":{"eventName":"exportSpace","request":{"spaceId":"${notionSpaceId}","exportOptions":{"exportType":"${notionExportType}","timeZone":"Europe/Brussels","locale":"en"}}}}`,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': notionCookie
            }
        });

        const enqueueTask = getResponseData(enqueueTaskResponse);
        const {
            taskId
        } = enqueueTask;

        asyncTimeout(10000);

        const getTasksResponse = await fetch("https://www.notion.so/api/v3/getTasks", {
            method: 'POST',
            body: `{"taskIds":["${taskId}"]}`,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': notionCookie
            }
        });

        const getTasks = getResponseData(getTasksResponse);
        const { exportURL } = getTasks.results[0].status;

        core.info(`--- notion_url ${exportURL} ---`);
        core.setOutput('notion_url', exportURL);

    } catch (error) {
        core.setFailed(error.message);
    }
}

core.setOutput('notion_url', 'default');
run();
