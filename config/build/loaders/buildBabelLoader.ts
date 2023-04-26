import { BuildOptions } from './../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean,
}

export function buildBabelLoader (options: BuildBabelLoaderProps) {
    const { isDev, isTsx } = options;
    
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                /*plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['en', 'ru'],
                            keyAsDefaultValue: false,
                            //saveMissing: true,
                            outputPath: 'public/locales/{{locale}}/{{ns}}.json', //t("key", {ns: "locale-file"})
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),*/
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx
                        }
                    ],
                    '@babel/plugin-transform-runtime',
                    // isTsx && [
                    //     babelRemovePropsPlugin,
                    //     {
                    //         props: ['data-testid']
                    //     }
                    // ],
                ]
            },
        },
    };
}