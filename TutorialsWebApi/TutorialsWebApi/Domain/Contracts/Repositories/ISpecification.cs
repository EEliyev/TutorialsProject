﻿using System.Linq.Expressions;

namespace TutorialsWebApi.Domain.Contracts.Repositories
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
    }
}
