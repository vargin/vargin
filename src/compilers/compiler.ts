export interface ICompiler<TEntity, TCompiledEntity> {
  compile(entity: TEntity): Promise<TCompiledEntity>;
  decompile(compiledEntity: TCompiledEntity): Promise<TEntity>;
}

export class AbstractCompiler<TEntity, TCompiledEntity> implements ICompiler<TEntity, TCompiledEntity> {
  compile(entity: TEntity): Promise<TCompiledEntity> {
    return Promise.reject<TCompiledEntity>(new Error('Not implemented!'));
  }

  decompile(compiledEntity: TCompiledEntity): Promise<TEntity> {
    return Promise.reject<TEntity>(new Error('Not implemented!'));
  }
}
