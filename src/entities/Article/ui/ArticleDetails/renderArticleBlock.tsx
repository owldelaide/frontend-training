import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock } from '../../model/types/article';

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent
                className={cls.block}
                key={block.id}
                block={block}
            />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent
                className={cls.block}
                key={block.id}
                block={block}
            />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent
                className={cls.block}
                key={block.id}
                block={block}
            />;
        default:
            return null;
    }
};