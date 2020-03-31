import core from '@actions/core';
import tc from '@actions/tool-cache';

function getPlatform() {
  const { platform } = process;
  if (platform === 'win32') {
    return 'windows';
  } else {
    return platform;
  }
}

async function run() {
  const version = core.getInput('version');
  const platform = getPlatform();

  try {
    let cachedPath = tc.find('kustomize', version, platform);

    if (!cachedPath) {
      const archive = await tc.downloadTool(`https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${version}/kustomize_v${version}_${platform}_amd64.tar.gz`);
      const path = await tc.extractTar(archive);
      cachedPath = await tc.cacheDir(path, 'kustomize', version, platform);
    }

    core.addPath(cachedPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
