export default {
    generator: [
        {
            input: "https://api.kuleu.com/api/suiji_renshe",
            platform: "swagger",
            output: "src/api",
            responseMediaType: "application/json",
            bodyMediaType: "application/json",
            version: "auto",
            type: "auto",
            global: "Apis",
            handleApi: (apiDescriptor) => {
                if (!apiDescriptor.path.startWith("/user")) {
                    return;
                }
                apiDescriptor.parameter = apiDescriptor.parameter.filter(
                    (param) => param.in === "header" && param.name === "token",
                );
                apiDescriptor.requestBody.id = undefined;
                apiDescriptor.url = apiDescriptor.url.replace("/user", "");
                return apiDescriptor;
            },
        },
    ],
    autoUpdate: true,
};
