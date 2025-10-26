total = 0
for i in range(1, 51):
    if i == 1:
        print(i)
    else:
        print(f"{total}＋{i}＝{total + i}です")
    total += i
    
