'use strict';

import { identity } from '../internal/identity';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer } from '../internal/comparer';

export function* distinct<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    cmp: (x: TKey, y: TKey) => boolean = comparer): Iterable<TSource> {
  let set = [];

  for (let item of source) {
      let key = keySelector(item);
      if (arrayIndexOf(set, key, cmp) !== -1) {
        set.push(key);
        yield item;
      }
  }
}