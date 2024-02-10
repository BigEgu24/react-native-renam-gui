// Assuming the necessary imports from utils.js are already defined
const { initPathName } = require("./state");
const {
  validateCreation,
  validateGitRepo,
  checkGitRepoStatus,
  validateNewName,
  validateNewBundleID,
  validateNewPathContentStr,
  getAndroidCurrentName,
  getIosCurrentName,
  getIosXcodeProjectPathName,
  getAndroidCurrentBundleID,
  renameIosFoldersAndFiles,
  updateIosFilesContent,
  updateIosNameInInfoPlist,
  renameAndroidBundleIDFolders,
  updateAndroidFilesContent,
  updateAndroidFilesContentBundleID,
  updateAndroidNameInStringsXml,
  updateOtherFilesContent,
  cleanBuilds,
  showSuccessMessages,
  gitStageChanges,
  checkPackageUpdate,
  bundleIDToPath,
} = require("./utils");

async function UpdateMyProject({
  newAppName,
  newDisplayName,
  newBundleID,
  path,
}) {
  initPathName(path);
  validateCreation();
  // // validateGitRepo();

  // // checkGitRepoStatus(); // Assuming you always want to check, otherwise, make this conditional

  // Assuming the validation functions can handle being passed directly these values
  validateNewName(newAppName, path);
  const pathContentStr = path;
  if (pathContentStr) {
    validateNewPathContentStr(pathContentStr);
  }
  if (newBundleID) {
    validateNewBundleID(newBundleID, ["ios", "android"]);
  }

  const currentAndroidName = getAndroidCurrentName();
  const currentIosName = getIosCurrentName();
  const currentPathContentStr = getIosXcodeProjectPathName();
  const newPathContentStr = newAppName;
  const currentAndroidBundleID = getAndroidCurrentBundleID();

  await renameIosFoldersAndFiles(newPathContentStr);
  await updateIosFilesContent({
    currentName: currentIosName,
    newName: newDisplayName,
    currentPathContentStr,
    newPathContentStr,
    newBundleID,
  });

  await updateIosNameInInfoPlist(newDisplayName);

  if (newBundleID) {
    await renameAndroidBundleIDFolders({
      currentBundleIDAsPath: bundleIDToPath(currentAndroidBundleID),
      newBundleIDAsPath: bundleIDToPath(newBundleID),
    });
  }

  await updateAndroidFilesContent({
    currentName: currentAndroidName,
    newName: newAppName,
    newBundleIDAsPath: bundleIDToPath(newBundleID || currentAndroidBundleID),
  });

  await updateAndroidFilesContentBundleID({
    currentBundleID: currentAndroidBundleID,
    newBundleID,
    currentBundleIDAsPath: bundleIDToPath(currentAndroidBundleID),
    newBundleIDAsPath: bundleIDToPath(newBundleID),
  });

  await updateAndroidNameInStringsXml(newDisplayName);
  await updateOtherFilesContent({
    newName: newDisplayName,
    currentPathContentStr,
    newPathContentStr,
    currentIosName,
    newAndroidBundleID: newBundleID,
    newIosBundleID: newBundleID,
  });

  cleanBuilds();
  showSuccessMessages(newDisplayName);
  // gitStageChanges();
  // checkPackageUpdate();
}
module.exports = { UpdateMyProject };
