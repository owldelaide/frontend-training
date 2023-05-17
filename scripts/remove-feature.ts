import { Project, SyntaxKind, Node } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
    throw new Error('feature flag is undefined');
}

if (!featureState) {
    throw new Error('feature state (on/off) is undefined');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('feature state should be on or off');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild(child => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

files.forEach(sourceFile => {
    sourceFile.forEachDescendant(node => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
            const onFunctionProperty = objectOptions?.getProperty('on');
            const offFunctionProperty = objectOptions?.getProperty('off');
            const featureNameProperty = objectOptions?.getProperty('name');

            const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty?.getFirstDescendantByKind(
                SyntaxKind.StringLiteral
            )?.getText().slice(1, -1);

            if (featureName !== removedFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '');
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '');
            }
        }
    });
});

project.save();