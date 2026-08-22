🧠 What you learned today

The major new JavaScript concept was .sort():

sort()
 ↓
comparator
 ↓
(a, b)
 ↓
negative / positive / zero
 ↓
ordering

And you applied it with:

localeCompare()
immutable copying with [...filteredCollabs]
literal SortOrder
derived sorted data
controlled sort UI

You also made an architectural decision yourself:

CollaborationFilters
        ↓
CollaborationControls

because the component now controls more than filtering.