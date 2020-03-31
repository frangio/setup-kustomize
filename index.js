import core from '@actions/core';
import tc from '@actions/tool-cache';

const version = '3.5.4';

async function run() {
  try {
    let cachedPath = tc.find('kustomize', version);

    if (!cachedPath) {
      const archive = await tc.downloadTool(`https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${version}/kustomize_v${version}_linux_amd64.tar.gz`);
      const path = await tc.extractTar(archive);
      cachedPath = await tc.cacheDir(path, 'kustomize', version);
    }

    core.addPath(cachedPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
