export interface ICompiler<TEntity, TCompiledEntity> {
  compile(entity: TEntity): Promise<TCompiledEntity>;
  decompile(compiledEntity: TCompiledEntity): Promise<TEntity>;
}
