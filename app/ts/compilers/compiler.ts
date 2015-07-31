export interface ICompiler<TEntity, TCompiledEntity> {
  compile(entity: TEntity): TCompiledEntity;
  decompile(compiledEntity: TCompiledEntity): TEntity;
}