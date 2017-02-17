C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script>gapps auth C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script\client_secret_565255536329-n73g7s3oq6prdnojlnep7j4qa6506f2o.apps.googleusercontent.com.json




Please visit the following url in your browser (you'll only have to do this once): https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=force&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.scripts&response_type=code&client_id=565255536329-n73g7s3oq6prdnojlnep7j4qa6506f2o.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A2386
Successfully Authenticated with Google Drive!

C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script>gapps init 1ZYAhkar-m6o4bnjU8k8AU0kOEeDPAFd4epJrSFeH8lWiqlhIHxyBtpnd

C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script>gapps upload
Pushing back up to Google Drive...
An error occured while running upload command: Access Not Configured. Drive API has not been used in project 565255536329 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/drive/overview?project=565255536329 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
Upload failed.

C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script>gapps upload
Pushing back up to Google Drive...
The latest files were successfully uploaded to your Apps Script project.

C:\Users\Jorge\Documents\dev\lionel_tool\desktop\google-apps-script>


gapps upload

npm start



mkdir build
cd build
mkdir dev
cd dev
gapps init *DRIVE_FILE_ID*
cd ../..
gulp upload-latest --env dev

https://script.google.com/macros/s/AKfycbwcryYEErcE2JJ5TG6xNEKQF0CH49b5k8by5cXBXP-M/dev