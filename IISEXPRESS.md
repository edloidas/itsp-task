## IIS Express: Deploy and Run ##

It's presumed, that the user already have the production build with `/public` folder under the project root.
If so, open the console and type the following:

```batchfile
"%ProgramFiles(x86)%\IIS Express\iisexpress.exe" /path:%PATH_TO_APP_PUBLIC% /port:8080
```

Note that the ``%PATH_TO_APP_PUBLIC%`` is an absolute path to the application `/public` folder, for example, you can run the application from the `d:\repo\itsp-task\public\` on port `8080`:

```batchfile
"%ProgramFiles(x86)%\IIS Express\iisexpress.exe" /path:d:\repo\itsp-task\public\ /port:8080
```
