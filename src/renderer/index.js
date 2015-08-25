var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

var MIN_WINDOW_WIDTH = 400;
var MIN_WINDOW_HEIGHT = 400;
var MAX_WINDOW_WIDTH = 300;
var MAX_WINDOW_HEIGHT = 300;
var MAX_WINDOW_X = 1500;
var MAX_WINDOW_Y = 1000;

var index = 0;

function addCode(textString) {
  var code = document.createElement("div");
  code.className = "code";
  var text = document.createTextNode(textString);
  code.appendChild(text);
  document.body.appendChild(code);
}

function createNewWindow() {
  var width = Math.floor(Math.random()*MAX_WINDOW_WIDTH) + MIN_WINDOW_WIDTH;
  var height = Math.floor(Math.random()*MAX_WINDOW_HEIGHT) + MIN_WINDOW_HEIGHT;
  var windowX = Math.floor(Math.random()*MAX_WINDOW_X) + 1;
  var windowY = Math.floor(Math.random()*MAX_WINDOW_Y) + 1;
  var newWindow = new BrowserWindow({ width: width, height: height, x: windowX, y: windowY });
  newWindow.loadUrl(`file://${__dirname}/../renderer/index.html`);
    newWindow.on('closed', () => {
      newWindow = null;
  });
}

var hereDocArray = (function () {/*
 // Copyright (c) 2014 GitHub, Inc.
 // Use of this source code is governed by the MIT license that can be
 // found in the LICENSE file.

 #include "atom/app/atom_content_client.h"

 #include <string>
 #include <vector>

 #include "atom/common/chrome_version.h"
 #include "atom/common/options_switches.h"
 #include "base/command_line.h"
 #include "base/strings/string_split.h"
 #include "base/strings/string_util.h"
 #include "content/public/common/content_constants.h"
 #include "content/public/common/pepper_plugin_info.h"
 #include "ppapi/shared_impl/ppapi_permissions.h"

 namespace atom {

 namespace {

 content::PepperPluginInfo CreatePepperFlashInfo(const base::FilePath& path,
 const std::string& version) {
 content::PepperPluginInfo plugin;

 plugin.is_out_of_process = true;
 plugin.name = content::kFlashPluginName;
 plugin.path = path;
 plugin.permissions = ppapi::PERMISSION_ALL_BITS;

 std::vector<std::string> flash_version_numbers;
 base::SplitString(version, '.', &flash_version_numbers);
 if (flash_version_numbers.size() < 1)
 flash_version_numbers.push_back("11");
 // |SplitString()| puts in an empty string given an empty string. :(
 else if (flash_version_numbers[0].empty())
 flash_version_numbers[0] = "11";
 if (flash_version_numbers.size() < 2)
 flash_version_numbers.push_back("2");
 if (flash_version_numbers.size() < 3)
 flash_version_numbers.push_back("999");
 if (flash_version_numbers.size() < 4)
 flash_version_numbers.push_back("999");
 // E.g., "Shockwave Flash 10.2 r154":
 plugin.description = plugin.name + " " + flash_version_numbers[0] + "." +
 flash_version_numbers[1] + " r" + flash_version_numbers[2];
 plugin.version = JoinString(flash_version_numbers, '.');
 content::WebPluginMimeType swf_mime_type(
 content::kFlashPluginSwfMimeType,
 content::kFlashPluginSwfExtension,
 content::kFlashPluginSwfDescription);
 plugin.mime_types.push_back(swf_mime_type);
 content::WebPluginMimeType spl_mime_type(
 content::kFlashPluginSplMimeType,
 content::kFlashPluginSplExtension,
 content::kFlashPluginSplDescription);
 plugin.mime_types.push_back(spl_mime_type);

 return plugin;
 }

 }  // namespace

 AtomContentClient::AtomContentClient() {
 }

 AtomContentClient::~AtomContentClient() {
 }

 std::string AtomContentClient::GetProduct() const {
 return "Chrome/" CHROME_VERSION_STRING;
 }

 void AtomContentClient::AddAdditionalSchemes(
 std::vector<std::string>* standard_schemes,
 std::vector<std::string>* savable_schemes) {
 auto command_line = base::CommandLine::ForCurrentProcess();
 auto custom_schemes = command_line->GetSwitchValueASCII(
 switches::kRegisterStandardSchemes);
 if (!custom_schemes.empty()) {
 std::vector<std::string> schemes;
 base::SplitString(custom_schemes, ',', &schemes);
 standard_schemes->insert(standard_schemes->end(),
 schemes.begin(),
 schemes.end());
 }
 standard_schemes->push_back("chrome-extension");
 }

 void AtomContentClient::AddPepperPlugins(
 std::vector<content::PepperPluginInfo>* plugins) {
 auto command_line = base::CommandLine::ForCurrentProcess();
 auto flash_path = command_line->GetSwitchValueNative(
 switches::kPpapiFlashPath);
 if (flash_path.empty())
 return;

 auto flash_version = command_line->GetSwitchValueASCII(
 switches::kPpapiFlashVersion);

 plugins->push_back(
 CreatePepperFlashInfo(base::FilePath(flash_path), flash_version));
 }

 }  // namespace atom
 */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].split(/\r\n|\r|\n/);

document.addEventListener('keydown', function(event) {
  if(index + 1 > hereDocArray.length) {
    createNewWindow();
    return;
  }

  var text = hereDocArray[index];
  addCode(text);
  window.scrollTo(0,document.body.scrollHeight);

  index++;
});
