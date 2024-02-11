# Disable PowerShell Version 2

PowerShell version 2 is only in windows 10 and 11 for backward compatibility.
Please remove it, for security reasons. It is often used for bypassing restrictions.

`Disable-WindowsOptionalFeature -Online -FeatureName MicrosoftWindowsPowerShellV2Root`
