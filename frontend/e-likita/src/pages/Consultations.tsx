"use client"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export type Consultation = {
  _id: string
  medication: string
  symptomDuration: string
  painLevel: number
}

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "medication",
    header: "Medication",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("medication")}</div>
    ),
  },
  {
    accessorKey: "symptomDuration",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Symptom Duration
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("symptomDuration")}</div>,
  },
  {
    accessorKey: "painLevel",
    header: () => <div className="text-right">Pain Level</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("painLevel")}</div>
    ),
  },
]

export default function Consultations() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { api } = useContext(AuthContext)!
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const navigate = useNavigate()

  const table = useReactTable<Consultation>({
    data: consultations,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    const getConsultations = async () => {
      try {
        const res = await api.get("/api/v1/consultations")
        if (res.status === 200 && Array.isArray(res.data.data.consultations)) {
          setConsultations(res.data.data.consultations)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err: any) {
        const message = err.response?.data?.message || err.message
        setError(message)
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }
    getConsultations()
  }, [])

  return (
    <div className="w-full">
      {/* Top Bar with Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Consultations</h1>
        <Button asChild className="bg-blue-700">
          <Link
            to="/portal/consultationform"
            className="inline-flex items-center gap-2 m-10"
          >
            <PlusCircle className="h-4 w-4" />
            New Consultation
          </Link>
        </Button>
      </div>

      {/* Filters and Columns */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter medication..."
          value={(table.getColumn("medication")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("medication")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border mb-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original._id}
                  onClick={() =>
                    navigate(`/portal/consultations/${row.original._id}`)
                  }
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No consultations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredRowModel().rows.length} row(s) total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
